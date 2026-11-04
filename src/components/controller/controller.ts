import AppLoader from './appLoader';
import { NewsResponse, SourcesResponse } from '../../types';

type Callback<T> = (data: T) => void;
class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: Callback<NewsResponse>): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    const sourceItems = document.querySelectorAll('.source__item');
                    sourceItems.forEach((item): void => item.classList.remove('source__item--active'));
                    target.classList.add('source__item--active');

                    target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
