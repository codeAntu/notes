import { useLoaderData, useLocation, useSubmit } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ChevronLeft,
  Delete,
  Pencil,
  Save,
  Trash,
  Trash2,
} from "lucide-react";
import Button from "../component/Button";

export default function Edit() {
  const { state } = useLocation();
  const [isEdited, setIsEdited] = useState(false);
  const [title, setTitle] = useState(state.title);
  const [content, setContent] = useState(state.content);
  const [id, setId] = useState(state.id);
  const [notes, setNotes] = useState([]) as any;
  const [delAlarm, setDelAlarm] = useState(false);
  const [delAlert, setDelAlert] = useState(false);

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

  function delNote() {
    const temp = notes.filter((note: any) => note.id !== id);
    setNotes(temp);
    localStorage.setItem("notes", JSON.stringify(temp));
  }

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      <div className="h-[100dvh]  py-5 px-2 ">
        <div className="flex items-center justify-between">
          <Link to="/">
            <ChevronLeft size={38} />
          </Link>

          <div className="flex gap-5 pr-5">
            {isEdited ? (
              <Check
                onClick={() => editNote()}
                size={28}
                strokeWidth={2.2}
                className="text-blue-700"
              />
            ) : (
              <Pencil onClick={() => {}} />
            )}
            <Trash2
              className="text-red-600"
              onClick={() => setDelAlert(true)}
            />
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
      {delAlert ? (
        <>
          <div
            className="bg-transparent h-full w-full fixed top-0 left-0 backdrop-blur-md"
            onClick={() => {
              setDelAlert(false);
            }}
          ></div>
          <div className="fixed bottom-4 bg-slate-950/50 border-2 border-white/5 pt-8 pb-4 px-4 backdrop-blur-md rounded-3xl object-none w-[92%] left-[4%] space-y-6 ">
            <div className="text-xl font-semibold text-center">
              Do you want to delete this Note ?
            </div>
            <div className="p-2 opacity-50 text-center text-sm">
              This action cannot be undone. This will permanently delete.{" "}
              <thead></thead>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Button
                text="No"
                onClick={() => {
                  setDelAlert(false);
                }}
              />
              <Button
                text="Delete"
                onClick={() => {
                  delNote();
                  window.history.back();
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
