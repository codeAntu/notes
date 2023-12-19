import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(0);
  const [notes, setNotes] = useState([]) as any;

  useEffect(() => {
    const notes = localStorage.getItem("notes");
    if (notes) {
      setNotes(JSON.parse(notes));
    }
  }, []);

  function AddNotes() {
    if (title === "" || content === "") {
      alert("Please fill all the fields");
      return;
    }

    const note = {
      title,
      content,
      id: Date.now(),
    };

    const newNotes = [...notes, note];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setTitle("");
    setContent("");
  }

  return (
    <div className="h-[100dvh] bg-white dark:bg-black text-black dark:text-white py-5 px-2">
      <div className="flex items-center justify-between">
        <Link to="/">
          <ChevronLeft size={38} />
        </Link>

        <div className="text-2xl font-medium pr-5" onClick={() => AddNotes()}>
          Save
        </div>
      </div>

      <div className=" mt-12 ">
        <input
          type="text"
          name=""
          id=""
          className="w-full bg-transparent outline-none py-4 px-4 font-semibold text-3xl"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Something down"
          className="w-full h-[50dvh] outline-none px-4 bg-transparent text-align-top text-lg "
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}
