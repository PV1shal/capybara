import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu";
  
  import {
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import NewRequestModal from "./NewRequestModal";
  import { useState } from "react";
  
  const CollectionContextMenu = ({ collection, collectionId, addRequestToCollection, deleteCollection }) => {
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [newRequestModalOpen, setNewRequestModalOpen] = useState(false);

    return (
        <>
            <ContextMenu open={contextMenuOpen} onOpenChange={setContextMenuOpen}>
                <ContextMenuTrigger>
                    <AccordionTrigger className="text-sm hover:bg-primary_select px-2 py-1">
                        <div className="flex items-center space-x-2">
                            {collection.collectionName}
                        </div>
                    </AccordionTrigger>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-52 font-bold text-primary_text bg-[#1c1c1c] border-0 shadow-2xl">
                    <ContextMenuItem 
                        inset
                        onClick={() => {
                            setNewRequestModalOpen(true);
                            setContextMenuOpen(false);
                        }}
                    >
                        New Request
                    </ContextMenuItem>
                    <ContextMenuItem 
                        inset 
                        className="text-red-500"
                        onClick={() => deleteCollection(collectionId)}
                    >
                        Delete Collection
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            <NewRequestModal 
                open={newRequestModalOpen}
                onOpenChange={setNewRequestModalOpen}
                collectionId={collectionId}
                addRequestToCollection={addRequestToCollection}
            />
        </>
    );
};
  
  export default CollectionContextMenu;
  