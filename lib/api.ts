
import axios from 'axios';
import { Note } from '@/types/note';

export const updateNoteById = async (
  id: number,
  note: {
    title: string;
    content: string;
    tag: string;
  }
) => {
  const { data } = await axios.put(`${API_BASE}/notes/${id}`, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};



export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (
  page = 1,
  query = ''
): Promise<NotesResponse> => {
  const searchParam = query ? `&search=${encodeURIComponent(query)}` : '';
  const url = `${API_BASE}/notes?page=${page}${searchParam}`;

  console.log('➡️ Fetch URL:', url);

  const { data } = await axios.get<NotesResponse>(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};



export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await axios.get<Note>(`${API_BASE}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};


export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${API_BASE}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};


export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await axios.post<Note>(`${API_BASE}/notes`, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};
