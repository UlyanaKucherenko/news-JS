import './sources.css';
import { Source } from '../../../types';

type SourceItem = Readonly<Pick<Source, 'id' | 'name'>>;
class Sources {
    public draw(data: SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            console.error('Source template not found');
            return;
        }

        data.forEach((item: SourceItem): void => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameEl = sourceClone.querySelector('.source__item-name');
            const itemEl = sourceClone.querySelector('.source__item');

            if (nameEl) nameEl.textContent = item.name;
            if (itemEl) itemEl.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
