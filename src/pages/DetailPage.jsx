<<<<<<< HEAD
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
=======
import React from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { showFormattedDate } from "../utils";

function DetailPage({ notes, onDelete, onArchive }) {
  // Menggunakan useParams untuk mendapatkan parameter 'id' dari URL
  const { id } = useParams();

  // Menggunakan useNavigate untuk navigasi
  const navigate = useNavigate();

  // Mencari catatan di dalam array 'notes' yang memiliki ID sesuai dengan ID dari URL

  const note = notes.find((note) => note.id === parseInt(id, 10));

  // Kondisi jika catatan dengan ID tersebut tidak ditemukan
  if (!note) {
    return (
      <div className="detail-not-found">
        <h2>Catatan tidak ditemukan</h2>
        <button onClick={() => navigate("/")}>Kembali ke Beranda</button>
      </div>
    );
  }

  // Jika catatan ditemukan, tampilkan detailnya
  return (
    <div className="detail-page">
      {/* Tombol untuk kembali ke halaman sebelumnya */}
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Kembali
      </button>
      {/* Judul catatan */}
      <h2 className="detail-page__title">{note.title}</h2>
      {/* Tanggal pembuatan catatan yang sudah diformat */}
      <p className="detail-page__date">{showFormattedDate(note.createdAt)}</p>
      {/* Isi catatan */}
      <div className="detail-page__body">{note.body}</div>
      {/* Tombol-tombol aksi */}
      <div className="detail-page__actions">
        {/* Tombol untuk mengarsipkan/mengaktifkan catatan */}
        <button
          onClick={() => {
            onArchive(note.id); // Mengarsipkan catatan
            navigate("/archives"); // Arahkan ke halaman arsip
          }}
          className="action-button archive"
        >
          {note.archived ? "Aktifkan" : "Arsipkan"}
        </button>
        {/* Tombol untuk menghapus catatan */}
        <button
          onClick={() => {
            onDelete(note.id);
            navigate("/"); // Setelah menghapus, kembali ke beranda
          }}
          className="action-button delete"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

// Proptypes untuk memastikan props yang diterima sesuai dengan yang diharapkan
DetailPage.propTypes = {
  notes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default DetailPage;
>>>>>>> f9c1ecc500beb9a78a8e315cfd26bfe9cec4fed1
