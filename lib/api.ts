import axios from 'axios';
import { Note } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

axios.defaults.headers.common.Authorization = `Bearer ${process.env.NOTEHUB_TOKEN}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (searchText: string, page) => {
  const response = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      ...(searchText !== '' && { search: searchText }),
      page,
      perPage: 12,
    },
  });
  return response.data;
};

interface NewNoteContent {
  title: string;
  content?: string;
  tag: string;
}

export const createNote = async (newNote: NewNoteContent) => {
  const response = await axios.post<Note>('/notes', newNote);
  return response.data;
};

export const fetchNoteById = async (noteId: number) => {
  const response = await axios.get<Note>(`/notes/${noteId}`);
  return response.data;
};
