import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function DropdownMenu({ actionType, edit, deleteItem }) {
   const menuItem =
      "font-medium text-sm text-start py-3 px-4 hover:bg-light-grey-1";

   return (
      <div className="relative">
         <Menu>
            <MenuButton className="outline-none">
               <img
                  src="/assets/icon-vertical-ellipsis.svg"
                  alt=""
                  className="cursor-pointer"
               />
            </MenuButton>
            <MenuItems className="absolute rounded-lg z-50 bg-white right-0 top-10 w-[170px] flex flex-col shadow-lg outline-none">
               <MenuItem>
                  <button onClick={edit} className={`text-grey ${menuItem}`}>
                     Edit {actionType}
                  </button>
               </MenuItem>
               <MenuItem>
                  <button
                     onClick={deleteItem}
                     className={`text-red ${menuItem}`}
                  >
                     Delete {actionType}
                  </button>
               </MenuItem>
            </MenuItems>
         </Menu>
      </div>
   );
}
