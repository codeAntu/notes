import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(Date.now());
  const [notes, setNotes] = useState([]) as any;

  useEffect(() => {
    const notes = localStorage.getItem("myNotes");
    if (notes) {
      setNotes(JSON.parse(notes));
    }
  }, []);

  useEffect(() => {
    if (title === "" && content === "") {
      setNotes((prevNotes: any) => {
        const newNotes = prevNotes.filter((n: any) => n.id !== id);
        localStorage.setItem("myNotes", JSON.stringify(newNotes));
        return newNotes;
      });
    } else if (title !== "" || content !== "") {
      const note = {
        title,
        content,
        id,
      };

      setNotes((prevNotes: any) => {
        const newNotes = prevNotes.filter((n: any) => n.id !== note.id);
        newNotes.push(note);
        localStorage.setItem("myNotes", JSON.stringify(newNotes));
        return newNotes;
      });
    }
  }, [title, content]);

  console.log(notes, "jd");

  return (
    <div className="h-[100dvh] bg-white dark:bg-black text-black dark:text-white py-5 px-2">
      <div className="flex items-center justify-between">
        <Link to="/">
          <ChevronLeft size={38} />
        </Link>

        <div
          className="text-2xl font-medium pr-5"
          onClick={() => window.history.back()}
        >
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
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
