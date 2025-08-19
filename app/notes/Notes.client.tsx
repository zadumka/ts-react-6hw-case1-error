"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api"";

import css from "./page.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  
  const { data, isSuccess } = useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const changeSearchQuery = (newQuery: string) => {
    setPage(1);
    setQuery(newQuery);
  };

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={changeSearchQuery} />
        {}
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      {isSuccess && <NoteList notes={notes} />}
    </div>
  );
}
