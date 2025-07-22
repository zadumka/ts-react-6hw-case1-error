import axios from "axios";
import type { Note, NoteFormValues } from "../types/note";

type FetchNotesParams = {
  page: number;
  searchQuery?: string;
  perPage?: number;
};

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async ({
  page = 1,
  searchQuery,
  perPage = 12,
}: FetchNotesParams): Promise<ApiResponse> => {
  const params: { [key: string]: unknown } = {
    page,
    perPage,
  };

  if (searchQuery) {
    params.search = searchQuery;
  }

  try {
    const response = await axios.get<ApiResponse>(`/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
};

export const createNote = async (newNote: NoteFormValues): Promise<Note> => {
  try {
    const response = await axios.post<Note>(`/notes`, newNote, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
};

export const deleteNote = async (id: number): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error;
  }
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  try {
    const response = await axios.get<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch note with id ${id}:`, error);
    throw error;
  }
};
