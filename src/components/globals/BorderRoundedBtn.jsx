export function BorderRoundedBtn({
  borderColor,
  bgColor,
  textColor,
  lable,
  handleAction,
  icon,
}) {
  return (
    <div
      onClick={handleAction}
      className={`w-auto min-w-max flex gap-2 items-center py-3 px-5 text-sm ${bgColor}  rounded-full border ${borderColor} cursor-pointer`}
    >
      {icon}
      <p className={`${textColor}`}>{lable}</p>
    </div>
  );
}
