import { Star } from "@gravity-ui/icons"
import { Avatar, Card, ToggleButton } from "@heroui/react"

export const ProductCard=()=>{

    return(
        <div>
            <Card className="w-[200px] gap-2 bg-[#16206355]">
                <div className="flex justify-between">
                    <img
          alt="Indie Hackers community"
          className="pointer-events-none aspect-square w-30 rounded-2xl object-cover select-none"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
        />
        <ToggleButton isIconOnly aria-label="Like">
        <Star />
      </ToggleButton>
                </div>
        
        <Card.Header>
          <Card.Title>Perfume</Card.Title>
          <Card.Description>$50000</Card.Description>
        </Card.Header>
        {/* <Card.Footer className="flex gap-2">
          <Avatar aria-label="Martha's profile picture" className="size-5">
            <Avatar.Image
              alt="Martha's avatar"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
            />
            <Avatar.Fallback className="text-xs">IH</Avatar.Fallback>
          </Avatar>
          <span className="text-xs">By Martha</span>
        </Card.Footer> */}
      </Card>
        </div>
    )
}