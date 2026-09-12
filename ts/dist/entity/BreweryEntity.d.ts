import { OpenBreweryDbEntityBase } from '../OpenBreweryDbEntityBase';
import type { OpenBreweryDbSDK } from '../OpenBreweryDbSDK';
import type { Control } from '../types';
import type { Brewery, BreweryLoadMatch, BreweryListMatch } from '../OpenBreweryDbTypes';
declare class BreweryEntity extends OpenBreweryDbEntityBase<Brewery> {
    constructor(client: OpenBreweryDbSDK, entopts: any);
    make(this: BreweryEntity): BreweryEntity;
    load(this: any, reqmatch?: BreweryLoadMatch, ctrl?: Control): Promise<BreweryEntity>;
    list(this: any, reqmatch?: BreweryListMatch, ctrl?: Control): Promise<BreweryEntity[]>;
}
export { BreweryEntity };
