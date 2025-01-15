import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CollectionContextMenu = ({ collection, addRequestToCollection, deleteCollection }) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <AccordionTrigger className="text-sm hover:bg-primary_select px-2 py-1">
                    <div className="flex items-center space-x-2">
                        {collection.collectionName}
                    </div>
                </AccordionTrigger>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52 font-bold text-primary_text bg-[#1c1c1c] border-0 shadow-2xl">
                <ContextMenuItem inset>
                    New Request
                </ContextMenuItem>
                <ContextMenuItem inset className="text-red-500">
                    Delete Collection
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
};

export default CollectionContextMenu;
