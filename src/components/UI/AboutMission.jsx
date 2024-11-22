import Image from "next/image";
import { storyContent } from "../data/aboutMission";

export default function AboutMission() {
    return (
     
        <section className="w-full py-24">
          <div className="section-container">
            <div className="grid grid-cols-12 gap-8">
              <div className="relative col-span-4">
                <div className="sticky top-32 space-y-8">
                  <div className="relative">
                    <span className="text-[200px] font-bold leading-none text-secondary opacity-10">
                      13
                    </span>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-secondary">
                      <span className="text-xl font-medium">Years of</span>
                      <br />
                      <span className="text-3xl font-bold">Excellence</span>
                    </div>
                  </div>

                  <div className="space-y-4 pl-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex size-16 items-center justify-center rounded-full bg-primary-light">
                        <span className="text-lg font-semibold text-secondary">
                          300+
                        </span>
                      </div>
                      <p className="text-sm text-secondary-light">
                        Projects Successfully Delivered
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex size-16 items-center justify-center rounded-full bg-primary-light">
                        <span className="text-lg font-semibold text-secondary">
                          50+
                        </span>
                      </div>
                      <p className="text-sm text-secondary-light">
                        Expert Team Members
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex size-16 items-center justify-center rounded-full bg-primary-light">
                        <span className="text-lg font-semibold text-secondary">
                          98%
                        </span>
                      </div>
                      <p className="text-sm text-secondary-light">
                        Client Satisfaction Rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-8">
                <div className="space-y-24">
                  {storyContent.map((content, index) => (
                    <div key={index} className="group relative">
                      <div className="relative">
                        <div className="grid grid-cols-12 gap-6">
                          <div className="col-span-5">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                              <Image
                                src={content.image}
                                alt={content.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>

                          <div className="col-span-7">
                            <div className="absolute -left-4 top-0 h-full w-[2px]">
                              <div className="h-full w-full bg-border/40" />
                              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-border/60" />
                            </div>

                            <div className="pl-8">
                              <div className="inline-block">
                                <h3 className="relative mb-4 text-2xl font-bold text-secondary">
                                  {content.title}
                                  <div className="absolute bottom-0 left-0 -mb-1 h-[1px] w-full bg-border/20" />
                                </h3>
                              </div>

                              <div className="relative">
                                <p className="text-base leading-relaxed text-secondary-light">
                                  {content.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}