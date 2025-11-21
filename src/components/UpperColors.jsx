const UpperColors = () => {
    return(
      <div className="w-full h-[5px] flex absolute top-0 left-0">
        {[
          "#FFFB84",
          "#84FF96",
          "#84F3FF",
          "#84B9FF",
          "#9084FF",
          "#DC84FF",
          "#FF84F7",
          "#FF787A",
        ].map((color, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: color }}></div>
        ))}
      </div>
    )
}
export default UpperColors