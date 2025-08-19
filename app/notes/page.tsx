import { dehydrate, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes({
      search: "",
      page: 1,
    }),
  });

 
  return (
    <NotesClient />
  );
}
