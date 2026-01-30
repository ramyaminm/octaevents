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
        <h3 className="font-semibold text-lg text-primary">
          {question}
        </h3>

        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-primary font-bold">
          {isOpen ? <Minus /> : <Plus />}
        </span>
      </button>

      {isOpen && (
        <div
          className="px-6 pb-6 text-[#413862] text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}
    </div>
  )
}
