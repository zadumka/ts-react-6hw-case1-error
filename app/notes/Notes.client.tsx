"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";

import css from "./page.module.css";

interface NotesClientProps {
  notesTag: string;
}

export default function NotesClient({ notesTag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

 
  const { data } = useQuery({
    queryKey: [""notes"", searchQuery, notesTag, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage, notesTag),
    placeholderData: keepPreviousData,
  });

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const changeSearchQuery = (newQuery: string) => {
   
    setSearchQuery(newQuery);
  };

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      <button className={css.button} onClick={toggleModal}>
        Create note +
      </button>

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <NoteForm />
         
        </Modal>
      )}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
