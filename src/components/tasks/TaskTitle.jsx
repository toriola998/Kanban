export default function TaskTitle({ item, index }) {
   const columnColors = [
      "#49C4E5",
      "#8471F2",
      "#67E2AE",
      "#E27C49",
      "#E549AB",
      "#F2D849",
      "#49E57C",
      "#4977E5",
   ];

   return (
      <p className="text-grey text-xs font-bold uppercase tracking-widest mb-6 flex-items gap-x-3 w-[280px]">
         <span
            className="h-4 w-4 rounded-full block"
            style={{
               backgroundColor: columnColors[index % columnColors.length],
            }}
         />
         {item.name} ({item.tasks?.length})
      </p>
   );
}
