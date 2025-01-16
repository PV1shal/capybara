import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

const NewRequestModal = ({ open, onOpenChange, collectionId, addRequestToCollection }) => {
    const [requestName, setRequestName] = useState("");
    const [requestMethod, setRequestMethod] = useState("GET");
    const [requestURL, setRequestURL] = useState("");

    const handleSubmit = () => {
        if (requestName.trim()) {
            addRequestToCollection(collectionId, requestName, requestMethod, requestURL);
            setRequestName("");
            setRequestMethod("GET");
            setRequestURL("");
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-primary_bg border-primary_border text-primary_text">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            New Request
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a new request to Collection
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <label className="text-sm text-gray-400 mb-2 block">
            Request Name
          </label>
          <Input
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
            placeholder="Enter collection name"
            className="border-primary_border bg-secondary_bg"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
        </div>

        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="bg-transparent border-primary_border hover:bg-primary_select"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary_button hover:bg-[#0a474f]"
            disabled={!requestName.trim()}
          >
            Create Collection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewRequestModal;
