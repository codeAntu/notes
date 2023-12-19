import { Camera, Search, Settings, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [notes, setNotes] = useState([]) as any;
  const navigate = useNavigate();

  useEffect(() => {
    const notes = localStorage.getItem("notes");
    if (notes) {
      setNotes(JSON.parse(notes).reverse());
    }
  }, []);

  return (
    <div className="p-5 dark:bg-black h-[100dvh] text-black  dark:text-white">
      <div className="flex items-center justify-between px-5 py-2 ">
        <div className="text-3xl font-bold text-blue-700">Notes</div>
        <div className="flex items-center gap-5">
          <Search />
          <Settings
            onClick={() => {
              localStorage.clear();
              setNotes([]);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10 auto-cols-min">
        {notes.map((note: any) => {
          return (
            <div
              key={note.id}
              className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 p-2.5 rounded-2xl text-ellipsis "
              onClick={() => navigate("/edit", { state: note })}
            >
              {getNote(note)}
            </div>
          );
        })}
      </div>
      <Link to="/add">
        <div className="fixed bottom-5 right-5 bg-blue-700 p-4 rounded-full">
          <Plus size={30} />
        </div>
      </Link>
    </div>
  );
}

function getNote(note: any) {
  return (
    <div className="overflow-hidden max-h-24 text-over text-ellipsis">
      <div className="text-2xl font-semibold pb-1">{note.title}</div>
      <div className="text-sm opacity-80">{note.content}</div>
      <div className="text-red-800">{note.id}</div>
    </div>
  );
}
