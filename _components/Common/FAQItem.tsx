'use client'
import Minus from '@/_components/SVGs/minus'
import Plus from '@/_components/SVGs/plus'

interface FAQItemProps {
  id: number
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

export default function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: FAQItemProps) {
  return (
    <div className="bg-[#F5F5F7] rounded-2xl">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left p-6"
      >
        <h3 className="font-semibold md:text-lg text-base text-primary w-[90%]">
          {question}
        </h3>

        <span className="md:w-8 w-6 md:h-8 h-6 flex items-center justify-center rounded-full bg-secondary text-primary font-bold">
          {isOpen ? <span className='block md:w-6 md:h-6 w-4 h-4'> <Minus /></span> : <span className='block md:w-5 md:h-5 w-4 h-4'> <Plus /></span>}
        </span>
      </button>

      {isOpen && (
        <div
          className="px-6 pb-6 text-[#413862] md:text-base text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}
    </div>
  )
}
