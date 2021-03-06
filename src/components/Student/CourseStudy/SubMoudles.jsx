import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Movie, Description, Assignment } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import { getVideo, submitAssignment,updateAssignment } from "../../../api";
import { toast } from "react-toastify";
import AssignmentSubmission from "./AssignmentSubmission";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },

  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState("panel0");
  const [content, setContent] = useState(props.content);
  const [documentTutorialDialog, setDocumentDialog] = useState(false);
  const [assignment, setAssignment] = useState({
    name: "",
  });
  const [submittedAssignment, setSubmittedAssignment] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(
    props.content[0] ? props.content[0]._id : ""
  );
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  const handleChange = (panel, id) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setExpandedIndex(id);
  };

  const getAssignment = (id, cid) => {
    getVideo(id, cid, 3).then((res) => {
      console.log(res.data);
      if (res.data.done) {
        setSubmittedAssignment(res.data.video);
        setDocumentDialog(true);
      } else {
        if (res.data.status) {
          setAssignment(res.data.video);
          setDocumentDialog(true);
        } else {
          toast(res.data.message);
        }
      }
    });
  };

  const documentDownload = (id, cId) => {
    getVideo(id, cId, 2).then((res) => {
      if (res.data.status) {
        toast("You tutorial document downloading...!!");
        console.log(res.data.video);
        let uri = `${window.hostname}/docs/${res.data.video.file}`;
        var link = document.createElement("a");
        // If you don't know the name or want to use
        // the webserver default set name = ''
        link.setAttribute("download", "tutorial");
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleDialog = () => {
    setDocumentDialog(false);
    setSubmittedAssignment();
    setAssignment({
      name: ''
    })
  };

  const handleSubmitAssignment = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("course_id", id);
    formData.append("assignment_id", assignment._id);

    submitAssignment(formData).then((res) => {
      if (res.data.status) {
        toast(res.data.message);
        setDocumentDialog(false);
      } else {
        toast(res.data.message);
      }
    });
  };


  const handleUpdateAssignment = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("course_id", id);
    formData.append("assignment_id", submittedAssignment._id);
    let param = {
      course_id: id,
      assignment_id: submittedAssignment._id
    }
    
    updateAssignment(formData, param).then((res) => {
      if (res.data.status) {
        toast(res.data.message);
        setDocumentDialog(false);
      } else {
        toast(res.data.message);
      }
    });
  };


  return (
    <div>
      <AssignmentSubmission
        handleShow={documentTutorialDialog}
        handleDialog={handleDialog}
        handleSubmit={handleSubmitAssignment}
        submittedAssignment={submittedAssignment}
        assignment={assignment}
        handleUpdateAssignment={handleUpdateAssignment}
      />
      {content.map((con, i) => (
        <Accordion
          square
          expanded={expanded === `panel${i}`}
          id={i}
          onChange={handleChange(`panel${i}`, con._id)}
        >
          <AccordionSummary aria-controls="panel1d-content">
            <Typography>
              {" "}
              {con.name} #{i + 1}, <small> {con.content.length} part </small>{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails id={`panel${i}-content`}>
            <div>
              <List dense={false}>
                {con.content.map((i, j) => (
                  <ListItem
                    onClick={() =>
                      i.reference == "Video"
                        ? history.push("/videoview/" + id + "/" + i.contentId)
                        : i.reference == "Document"
                        ? documentDownload(id, i.contentId)
                        : getAssignment(id, i.contentId)
                    }
                    button
                  >
                    <ListItemIcon>
                      {i.reference == "Video" ? (
                        <Movie />
                      ) : i.reference == "Document" ? (
                        <Description />
                      ) : (
                        <Assignment />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={`${i.contentName}`} />
                  </ListItem>
                ))}
              </List>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
