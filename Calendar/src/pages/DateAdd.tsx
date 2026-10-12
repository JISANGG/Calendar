import * as React from "react"

import { Slider, Sketch, Material, Colorful, Compact, Circle, Swatch, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import { Alpha, Hue, ShadeSlider, Saturation, Interactive, hsvaToHslaString } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';

import { APIProvider, AdvancedMarker, Map, useMapsLibrary } from "@vis.gl/react-google-maps"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"

type SelectedLocation = {
  name: string
  address: string
  lat: number
  lng: number
}

type DateAddProps = {
  initialDate: Date
  onCancel: () => void
  onAdd: (
    title: string,
    content: string,
    date: string,
    time: string,
    amountSpend: string,
    location?: string,
  ) => void
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function LocationSearchMap({
  onSelectLocation,
}: {
  onSelectLocation: (location: SelectedLocation | null) => void
}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const placesLibrary = useMapsLibrary("places")
  const [selectedLocation, setSelectedLocation] = React.useState<SelectedLocation | null>(null)
  const [center, setCenter] = React.useState({ lat: 37.5665, lng: 126.978 })

  React.useEffect(() => {
    if (!placesLibrary || !inputRef.current) {
      return
    }

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["establishment", "geocode"],
      fields: ["place_id", "geometry", "name", "formatted_address"],
      componentRestrictions: { country: "KR" },
    })

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()
      const geometry = place.geometry

      if (!geometry?.location) {
        return
      }

      const nextLocation = {
        name: place.name || place.formatted_address || "선택한 장소",
        address: place.formatted_address || "",
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      }

      setSelectedLocation(nextLocation)
      setCenter({ lat: nextLocation.lat, lng: nextLocation.lng })
      onSelectLocation(nextLocation)
    })

    return () => {
      listener.remove()
      google.maps.event.clearInstanceListeners(autocomplete)
    }
  }, [onSelectLocation, placesLibrary])

  return (
    <div className="grid gap-3">
      <Input
        ref={inputRef}
        type="text"
        placeholder="장소를 검색하세요"
        className="w-full"
      />

      <div className="overflow-hidden rounded-md border bg-muted/20">
        <Map
          defaultZoom={13}
          center={center}
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="h-52 w-full"
        >
          {selectedLocation && (
            <AdvancedMarker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
          )}
        </Map>
      </div>

      <div className="rounded-md border bg-muted/20 p-2 text-xs text-muted-foreground">
        {selectedLocation ? (
          <div className="grid gap-1">
            <span className="font-medium text-foreground">{selectedLocation.name}</span>
            <span>{selectedLocation.address}</span>
          </div>
        ) : (
          <span>검색 결과가 이곳에 표시됩니다.</span>
        )}
      </div>

      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => {
          onSelectLocation(selectedLocation)
        }}
      >
        선택 완료
      </Button>
    </div>
  )
}

export function DateAdd({ initialDate, onCancel, onAdd }: DateAddProps) {
  const [title, setTitle] = React.useState("")
  const [date, setDate] = React.useState(() => toDateInputValue(initialDate))
  const [time, setTime] = React.useState("09:00")
  const [content, setContent] = React.useState("")
  const [amountspend, setAmountspend] = React.useState("")
  const [selectedLocation, setSelectedLocation] = React.useState<SelectedLocation | null>(null)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onAdd(
      title.trim(),
      content.trim(),
      date,
      time,
      amountspend.trim(),
      selectedLocation?.name || undefined,
    )
  }

  return (
    <form className="grid h-130 gap-6" onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>일정 추가</DialogTitle>
        <DialogDescription>
          날짜와 시간을 정해 새로운 일정을 등록하세요.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          일정 이름
          <Input
            autoFocus
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="예: 팀원과 회의"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          상세 내용
          <Input
            required
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder=""
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="grid gap-2 text-sm font-medium">
            날짜
            <Input
              required
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            시간
            <Input
              required
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="grid gap-2 text-sm font-medium">
            지출 추가
            <Input
              required
              type="text"
              value={amountspend}
              placeholder="예: 10000원"
              onChange={(event) => setAmountspend(event.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-2">
            {selectedLocation && (
              <span className="max-w-40 truncate text-xs text-muted-foreground">
                {selectedLocation.name}
              </span>
            )}
          </div>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button type="button" variant="outline" className="w-fit">
                <MapPin className="mr-2 h-4 w-4" />
                위치 추가하기
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-[360px] p-3">
              {apiKey ? (
                <APIProvider apiKey={apiKey} libraries={["places"]}>
                  <LocationSearchMap onSelectLocation={setSelectedLocation} />
                </APIProvider>
              ) : (
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <p>Google Maps API 키가 없어서 지도를 불러올 수 없습니다.</p>
                  <p>.env에 VITE_GOOGLE_MAPS_API_KEY를 추가해 주세요.</p>
                </div>
              )}
            </HoverCardContent>
          </HoverCard>
        </div>
        <div>
          <HoverCard>
            <HoverCardTrigger>
                <Button className="w-fit " variant="outline">색상 고르기</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <Sketch></Sketch>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">일정 등록</Button>
      </DialogFooter>
    </form>
  )
}

export default DateAdd
