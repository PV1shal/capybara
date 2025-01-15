import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

const NewRequestModal = ({ newCollection }) => {
  const [open, setOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const handleSubmit = () => {
    if (collectionName.trim()) {
      newCollection(collectionName);
      setCollectionName("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="hover:bg-primary_select rounded cursor-pointer">
          <FaPlus />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-primary_bg border-primary_border text-primary_text">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">New Collection</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a new collection to organize your API requests
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <label className="text-sm text-gray-400 mb-2 block">
            Collection Name
          </label>
          <Input 
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Enter collection name"
            className="border-primary_border bg-secondary_bg"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
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
            disabled={!collectionName.trim()}
          >
            Create Collection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewRequestModal;