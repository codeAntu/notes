import { Camera, Search, Settings, Plus, Divide, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [notes, setNotes] = useState([]) as any;
  const navigate = useNavigate();
  const [isSearched, setIsSearched] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedNotes, setSearchedNotes] = useState([]) as any;

  useEffect(() => {
    const notes = localStorage.getItem("myNotes");
    if (notes) {
      setNotes(JSON.parse(notes).reverse());
    }
  }, []);

  useEffect(() => {
    if (search === "") return setSearchedNotes(notes);
    const temp = notes.filter(
      (note: any) =>
        note.title.includes(search) || note.content.includes(search)
    );
    setSearchedNotes(temp);
  }, [search]);

  console.log(notes, "home");

  return (
    <div className="p-5 dark:bg-black min-h-[100dvh] text-black  dark:text-white">
      <div className="flex items-center justify-between px-5 py-2 ">
        <div className="text-3xl font-bold text-blue-700">Notes</div>
        <div className="flex items-center gap-5">
          <Search onClick={() => setIsSearched(true)} />
          <Settings
            onClick={() => {
              localStorage.clear();
              setNotes([]);
            }}
          />
        </div>
      </div>
      {isSearched ? (
        <div>
          <div className="px-3 flex bg-black/10 dark:bg-white/10 rounded-full flex-grow items-center justify-between mt-3">
            {" "}
            <Search />
            <input
              type="text"
              className="grow p-2.5 bg-transparent outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <X
              onClick={() => {
                setIsSearched(false);
                setSearch("");
              }}
            />
          </div>
          {showNotes(searchedNotes, navigate)}
        </div>
      ) : (
        showNotes(notes, navigate)
      )}

      <Link to="/add">
        <div className="fixed bottom-5 right-5 bg-blue-700 p-4 rounded-full">
          <Plus size={30} />
        </div>
      </Link>
    </div>
  );
}

function showNotes(notes: any, navigate: any) {
  return (
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
  );
}

function getNote(note: any) {
  return (
    <div className="overflow-hidden max-h-24   text-over text-ellipsis">
      <div className="text-2xl font-semibold pb-1">{note.title}</div>
      <div className="text-sm opacity-80">{note.content}</div>
    </div>
  );
}
