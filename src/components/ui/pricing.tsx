import { CircleCheckBig, X, CircleCheck } from 'lucide-react';

interface PlanFeatureProps{
    included: boolean;
    limited?: boolean;
    children: React.ReactNode;
}

export function PlanFeature({included, limited, children}: PlanFeatureProps) {
    if (!included) {
        return (
            <div className="flex items-center gap-3">
                <X className="text-red-600"></X> 
                <div className="text-gray-500">{children}</div>
            </div>
        )
    }
    if (included && limited) {
        return (
            <div className="flex items-center gap-3">
                <CircleCheckBig className="text-orange-400"></CircleCheckBig> 
                <div className="font-semibold">{children}</div>
            </div>
        );
    }
    else {
        return (
            <div className="flex items-center gap-3">
                <CircleCheckBig className="text-green-600"></CircleCheckBig> 
                <div className="font-semibold">{children}</div>
            </div>
        )
    }
}