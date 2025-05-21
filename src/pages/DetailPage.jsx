// src/pages/DetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/api";

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={id} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const note = await getNote(this.props.id);
      this.setState({ note, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    if (!this.state.note) {
      return <p>Catatan tidak ditemukan!</p>;
    }

    return (
      <section>
        <h2>{this.state.note.title}</h2>
        <p>{this.state.note.body}</p>
      </section>
    );
  }
}

export default DetailPageWrapper;
