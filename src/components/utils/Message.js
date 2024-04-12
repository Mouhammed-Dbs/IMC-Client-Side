export default function Message(props) {
  if (props.type === "sender")
    return (
      <div class="flex items-center self-end rounded-xl rounded-br bg-blue-500 py-2 px-3 text-white">
        <p>{props.message}</p>
      </div>
    );
  if (props.type === "receiver")
    return (
      <div class="flex items-center self-start rounded-xl rounded-tl bg-gray-300 py-2 px-3">
        <p>{props.message}</p>
      </div>
    );
  return <span>Unknown</span>;
}
