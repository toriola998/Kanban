export default function BoardList({ children }) {
   return (
      <>
         <div className="px-8 pt-8 w-[inherit]">
            {children}
            <p className="text-xs text-grey font-bold mb-5">ALL BOARDS (3)</p>
         </div>
         <ul className="pr-6">
            <li className="text-grey list-item">
               <img src="/assets/icon-board.svg" alt="" />
               Platform Launch
            </li>
            <li className="bg-main-purple text-white rounded-r-full list-item">
               <img
                  src="/assets/icon-board.svg"
                  alt=""
                  style={{ filter: "brightness(200%) contrast(150%)" }}
               />
               Platform Launch
            </li>

            <li className="text-main-purple list-item">
               <img src="/assets/icon-board-purple.svg" alt="" />+ Create New
               Board
            </li>
         </ul>
      </>
   );
}
