const {__} = wp.i18n;
const {compose} = wp.compose;
const {withDispatch, withSelect} = wp.data;
const {useState, useEffect} = wp.element;
import ChallengeDot from '~redux-templates/challenge/tooltip/ChallengeDot';
import {IconButton} from '@wordpress/components'
import SVGViewFew from './images/view-few.svg'
import SVGViewMany from './images/view-many.svg'
import SVGViewNormal from './images/view-normal.svg'
import {reloadLibrary} from '~redux-templates/stores/actionHelper';
import './style.scss'

function TemplateListSubHeader(props) {
    const {itemType, sortBy, activeCollection, challengePassed, pageData, columns, loading} = props;
    const {setSortBy, setColumns, setChallengeOpen} = props;
    const [triggerTourClassname, setTriggerTourClassname] = useState('far fa-question-circle tour-icon');

    useEffect(() => {
        setTriggerTourClassname(challengePassed ? 'fas fa-trophy tour-icon' : 'far fa-question-circle tour-icon');
    }, [challengePassed]);

    const itemTypeLabel = () => {
        if (itemType === 'section') return __('Sections', redux_templates.i18n);
        if (itemType === 'page') return __('Pages', redux_templates.i18n);
        if (itemType === 'collection' && activeCollection === null) return __('Collections', redux_templates.i18n);
        if (itemType === 'collection' && activeCollection !== null) return __('Sections', redux_templates.i18n);
    };

    const dataLength = pageData ? pageData.length : '';

    let pageTitle = '';
    if (loading === false && dataLength && dataLength !== 0) {
        pageTitle = <span>{dataLength} {itemTypeLabel()}</span>;
    }

    return (
        <div className="redux-templates-template-list-sub-header">
            <h4>
                {pageTitle}
                <ChallengeDot step={3} />
            </h4>
            <div className="redux-templates-template-filters">
                <IconButton
                    icon={<i className={triggerTourClassname} />}
                    label={__('Trigger Tour', redux_templates.i18n)}
                    onClick={() => setChallengeOpen(true)}
                />

                <IconButton
                    icon="image-rotate"
                    label={__('Refresh Library', redux_templates.i18n)}
                    className="refresh-library"
                    onClick={reloadLibrary}
                />
                <IconButton
                    icon={<SVGViewFew width="18" height="18"/>}
                    className={columns === 'large' ? 'is-active' : ''}
                    label={__('Large preview', redux_templates.i18n)}
                    onClick={() => setColumns('large')}
                />
                <IconButton
                    icon={<SVGViewNormal width="18" height="18"/>}
                    className={columns === '' ? 'is-active' : ''}
                    label={__('Medium preview', redux_templates.i18n)}
                    onClick={(e) => setColumns('')}
                />
                <IconButton
                    icon={<SVGViewMany width="18" height="18"/>}
                    className={columns === 'small' ? 'is-active' : ''}
                    label={__('Small preview', redux_templates.i18n)}
                    onClick={(e) => setColumns('small')}
                />
                <div className="">
                    <select name="sortBy" id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">{__('Name', redux_templates.i18n)}</option>
                        {/*<option value="popularity">{__('Popularity', redux_templates.i18n)}</option>*/}
                        <option value="updated">{__('Updated', redux_templates.i18n)}</option>
                    </select>
                </div>
            </div>
        </div>
    );
}


export default compose([
    withDispatch((dispatch) => {
        const {setLibrary, setActivePriceFilter, setActiveCollection, setSortBy, setColumns, setChallengeOpen} = dispatch('redux-templates/sectionslist');
        return {
            setLibrary,
            setActivePriceFilter,
            setActiveCollection,
            setSortBy,
            setColumns,
            setChallengeOpen
        };
    }),

    withSelect((select, props) => {
        const {fetchLibraryFromAPI, getActiveItemType, getColumns, getPageData, getActiveCollection, getStatistics, getSortBy, getLoading, getChallengePassed} = select('redux-templates/sectionslist');
        return {
            fetchLibraryFromAPI,
            itemType: getActiveItemType(),
            pageData: getPageData(),
            columns: getColumns(),
            statistics: getStatistics(),
            sortBy: getSortBy(),
            activeCollection: getActiveCollection(),
            loading: getLoading(),
            challengePassed: getChallengePassed()
        };
    })
])(TemplateListSubHeader);
