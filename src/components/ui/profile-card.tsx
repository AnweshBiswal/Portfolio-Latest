import React, { useState, useEffect } from 'react'

/** I. CONFIGURATION */
export const CARD_CONFIG = {
  width: 360,
  height: 480,
  glowColor: 'cyan',
  buttonText: "View Resume",
  animation: {
    statusInterval: 2500,
    fadeDuration: 500,
  },
}

export const TIER_STYLES = {
  3: {
    name: 'Gold',
    glowClass: 'shadow-amber-400/50 border-amber-400 bg-amber-400',
  },
  // Add more tiers here
}

/** II. CUSTOM HOOK */
export const useAnimatedStatus = (statuses: string[], interval: number) => {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [visible, setVisible] = useState(statuses[0])

  useEffect(() => {
    if (statuses.length <= 1) return
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        const next = (index + 1) % statuses.length
        setIndex(next)
        setVisible(statuses[next])
        setFading(false)
      }, CARD_CONFIG.animation.fadeDuration)
    }, interval)
    return () => clearInterval(timer)
  }, [index, statuses, interval])

  return (
    <span
      className={`
        transition-opacity 
        duration-500 
        ${fading ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {visible}
    </span>
  )
}

/** III. UI PARTS */
export const FloatingBadge = ({ text, className = '' }: { text: string, className?: string }) => (
  <div
    className={`
      absolute 
      text-amber-300/50 
      font-bold 
      text-6xl 
      select-none 
      pointer-events-none
      ${className}
    `}
    style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
  >
    {text}
  </div>
)

export const ProfileImage = ({ imageUrl, username }: { imageUrl: string, username: string }) => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px]">
    <div className="w-full h-full rounded-full bg-zinc-800 p-1 ring-2 ring-zinc-600">
      <img
        src={imageUrl}
        alt={username}
        className="w-full h-full rounded-full object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&q=80'
        }}
      />
    </div>
  </div>
)

export const ProfileDetails = ({ data }: { data: any }) => {
  const animated = useAnimatedStatus(
    data.status,
    CARD_CONFIG.animation.statusInterval
  )
  return (
    <div className="p-6 pt-24 text-[#efeee9] text-center h-full flex flex-col justify-center">
      <h2 className="text-4xl font-bold tracking-tight">{data.username}</h2>
      <p className="text-lg text-[#efeee9]/70 mt-4 max-w-xs mx-auto font-light leading-relaxed">
        {data.bio}
      </p>
      <div
        className="absolute bottom-10 right-0 left-0 text-center text-xl font-bold text-amber-400 tracking-widest uppercase"
        style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
      >
        {animated}
      </div>
    </div>
  )
}

/** IV. MAIN COMPONENT */
export default function ProfileCard({ data }: { data: any }) {
  const [hover, setHover] = useState(false)
  const tierStyle = TIER_STYLES[data.tier as keyof typeof TIER_STYLES] || {}

  return (
    <div className="relative mx-auto" style={{ width: CARD_CONFIG.width, height: CARD_CONFIG.height }}>
      <div
        className="absolute inset-0 cursor-pointer transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: hover
            ? 'rotateY(5deg) rotateX(-10deg) scale(1.05)'
            : 'scale(1)',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FloatingBadge text="dev" className="top-[-10px] right-[-30px] animate-[float_4s_ease-in-out_infinite]" />
        <FloatingBadge text="21" className="bottom-[40px] left-[-20px] scale-75 animate-[float-reverse_5s_ease-in-out_infinite]" />

        <div className="absolute inset-0 bg-[#1e2020]/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-[#333535]">
          <ProfileDetails data={data} />
        </div>

        <div
          className="absolute top-0 left-0 w-full h-[45%] transition-transform duration-500 ease-in-out"
          style={{
            transform: hover ? 'translateY(-70%)' : 'translateY(0%)',
          }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-3xl backdrop-blur-md border border-foreground/5 shadow-lg" />
          <div
            className={`
              absolute 
              top-0 
              right-0 
              h-full 
              w-1.5 
              rounded-r-3xl 
              border-r-2 
              ${tierStyle.glowClass}
            `}
            style={{ boxShadow: `0 0 20px 3px var(--tw-shadow-color)` }}
          />
          <ProfileImage
            imageUrl={data.imageUrl}
            username={data.username}
          />
        </div>
      </div>
    </div>
  )
}
