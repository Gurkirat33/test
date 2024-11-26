export default function Demo(){
    return (
        <div className="relative w-fit mx-auto">
        <span className="text-[120px] md:text-[150px] lg:text-[200px] font-bold leading-none text-secondary opacity-10">
          13
        </span>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-secondary">
          <span className="text-lg md:text-xl font-medium">Years of</span>
          <br />
          <span className="text-2xl md:text-3xl font-bold">Excellence</span>
        </div>
      </div>
    // <div className="text-[8vw] mx-auto w-fit text-primary-light">
    //     13+ Years of Experience
    // </div>
    )
}