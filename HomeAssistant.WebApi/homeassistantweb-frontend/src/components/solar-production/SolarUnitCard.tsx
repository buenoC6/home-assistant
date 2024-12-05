import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ISolarUnitCard {
  number: number
  label: string
  imageUrl: string
  unit?: string
  className?: string
}

export function SolarUnitCard({
  number,
  label,
  imageUrl,
  unit = 'kW',
  className,
}: ISolarUnitCard) {
  return (
    <Card style={{ width: '100%' }} className={className}>
      <CardHeader className={'p-1.5'}>
        <CardTitle className={'flex justify-center pt-1'}>
          <img alt={'design'} width={40} height={40} src={imageUrl} />
        </CardTitle>
      </CardHeader>
      <CardContent className={'pt-2'}>
        <div className={'text-center'}>
          <span className={'text-xl'}>{number}</span>{' '}
          <span className={'text-gray-500'}>{unit}</span>
        </div>
        <div className={'text-center'}>
          <span className={'text-gray-500'}>{label}</span>
        </div>
      </CardContent>
    </Card>
  )
}
