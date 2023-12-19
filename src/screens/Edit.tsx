import { useLoaderData, useLocation, useSubmit } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Edit() {
  const { state } = useLocation();
  const [isEdited, setIsEdited] = useState(false);
  const [title, setTitle] = useState(state.title);
  const [content, setContent] = useState(state.content);
  const [id, setId] = useState(state.id);
  const [notes, setNotes] = useState([]) as any;

  console.log(state);

  useEffect(() => {
    const notes = localStorage.getItem("notes");
    if (notes) {
      setNotes(JSON.parse(notes));
    }
  }, []);

  function editNote() {
    if (title === "" || content === "") {
      alert("Please fill all the fields");
      return;
    }

    const note = {
      title,
      content,
      id: Date.now(),
    };

    setId(note.id);
    const temp = notes.filter((note: any) => note.id !== id);
    const newNotes = [...temp, note];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  return (
    <div className="h-[100dvh] bg-white dark:bg-black text-black dark:text-white py-5 px-2">
      <div className="flex items-center justify-between">
        <Link to="/">
          <ChevronLeft size={38} />
        </Link>

        {isEdited ? (
          <div className="text-2xl font-medium pr-5" onClick={() => editNote()}>
            Save
          </div>
        ) : (
          <div className="text-2xl font-medium pr-5">Edit</div>
        )}
      </div>

      <div className=" mt-12 ">
        <input
          type="text"
          name=""
          id=""
          className="w-full bg-transparent outline-none py-4 px-4 font-semibold text-3xl"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIsEdited(true);
          }}
        />
        <textarea
          placeholder="Note Something down"
          className="w-full h-[50dvh] outline-none px-4 bg-transparent text-align-top text-lg "
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setIsEdited(true);
          }}
        />
      </div>
    </div>
  );
}
