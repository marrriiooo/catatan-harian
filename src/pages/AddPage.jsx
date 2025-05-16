import React from "react";
import PropTypes from "prop-types";
import NoteForm from "../components/NoteForm";

const AddPage = ({ onAddNote }) => {
  return (
    <>
      <h2>Detail catatan</h2>
      <NoteForm onAddNote={onAddNote} />
    </>
  );
};

AddPage.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};

export default AddPage;
