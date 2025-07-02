import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import styled from 'styled-components'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselViewport = styled.div`
  overflow: hidden;
`;

const CarouselContentStyled = styled.div<{ orientation: "horizontal" | "vertical" }>`
  display: flex;
  ${({ orientation }) => 
    orientation === "horizontal" 
      ? "margin-left: -1rem;" 
      : "margin-top: -1rem; flex-direction: column;"
  }
`;

const CarouselItemStyled = styled.div<{ orientation: "horizontal" | "vertical" }>`
  min-width: 0;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 100%;
  ${({ orientation }) => 
    orientation === "horizontal" 
      ? "padding-left: 1rem;" 
      : "padding-top: 1rem;"
  }
`;

const CarouselButtonStyled = styled.button<{ 
  orientation: "horizontal" | "vertical";
  direction: "prev" | "next";
}>`
  position: absolute;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray[900]};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  ${({ orientation, direction }) => {
    if (orientation === "horizontal") {
      return direction === "prev" 
        ? `
          left: -3rem;
          top: 50%;
          transform: translateY(-50%);
        `
        : `
          right: -3rem;
          top: 50%;
          transform: translateY(-50%);
        `;
    } else {
      return direction === "prev"
        ? `
          top: -3rem;
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
        `
        : `
          bottom: -3rem;
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
        `;
    }
  }}
`;

const IconWrapper = styled.span`
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          orientation,
        }}
      >
        <CarouselContainer
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={className}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </CarouselContainer>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <CarouselViewport ref={carouselRef}>
      <CarouselContentStyled
        ref={ref}
        orientation={orientation}
        className={className}
        {...props}
      />
    </CarouselViewport>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <CarouselItemStyled
      ref={ref}
      orientation={orientation}
      role="group"
      aria-roledescription="slide"
      className={className}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <CarouselButtonStyled
      ref={ref}
      orientation={orientation}
      direction="prev"
      className={className}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <IconWrapper>
        <ArrowLeft size={16} />
      </IconWrapper>
      <ScreenReaderOnly>Previous slide</ScreenReaderOnly>
    </CarouselButtonStyled>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <CarouselButtonStyled
      ref={ref}
      orientation={orientation}
      direction="next"
      className={className}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <IconWrapper>
        <ArrowRight size={16} />
      </IconWrapper>
      <ScreenReaderOnly>Next slide</ScreenReaderOnly>
    </CarouselButtonStyled>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} 