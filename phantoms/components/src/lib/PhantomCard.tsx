import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@phantombuster/design-system/components';
import { IPhantom } from '@phantombuster/phantoms/types';

export interface PhantomCardProps {
  phantom: IPhantom;
}

export function PhantomCard({ phantom }: PhantomCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{phantom.name}</CardTitle>
        <CardDescription>
          {phantom.manifest.tags.categories.join(' ')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{phantom.launchType}</p>
        <p>{!!phantom.repeatedLaunchTimes?.simplePreset}</p>
      </CardContent>
    </Card>
  );
}
