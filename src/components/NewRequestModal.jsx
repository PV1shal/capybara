import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import { Input } from "./ui/input";

const NewRequestModal = ({setCollections}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <FaPlus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Request</DialogTitle>
          <DialogDescription>
            <Input />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewRequestModal;
