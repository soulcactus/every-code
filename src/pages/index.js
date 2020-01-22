import React, {
    useState,
    useReducer,
    useRef,
    useEffect,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Head from 'components/Head';
import Layout from 'components/Layout';
import Message from 'components/Message';
import SwitchBookmark from 'components/SwitchBookmark';
import Search from 'components/Search';
import NoResult from 'components/NoResult';
import Category from 'components/Category';
import CodeContainer from 'components/CodeContainer';
import CodeItem from 'components/CodeItem';
import GoTop from 'components/GoTop';

import unmarked from 'images/bookmark-unmarked.svg';
import marked from 'images/bookmark-marked.svg';

export const data = graphql`
    query codeQuery {
        allCode {
            edges {
                node {
                    id
                    char
                    name
                    category
                    htmlEntity
                    htmlCode
                    hexCode
                    cssCode
                }
            }
        }
    }
`;

const reducer = (state, action) => {
    switch (action.type) {
        case 'switch': {
            return { ...state, switchState: action.switch };
        }

        case 'search': {
            return { ...state, searchValue: action.search };
        }

        case 'category': {
            return { ...state, categoryIndex: action.category };
        }

        case 'bookmark': {
            return { ...state, bookmarkState: action.bookmark };
        }

        case 'bookmarkList': {
            return { ...state, bookmarkList: action.bookmarkList };
        }

        case 'copy': {
            return { ...state, copyState: action.copy };
        }

        default: {
            throw new Error(`unexpected action.type: ${action.type}`);
        }
    }
};

const initialState = {
    switchState: false,
    searchValue: '',
    categoryIndex: 0,
    bookmarkState: false,
    bookmarkList: [],
    copyState: false,
};

function IndexPage({ data }) {
    const localStorage =
        typeof window !== 'undefined' ? window.localStorage : null;
    const edges = data.allCode.edges;
    const initialCodeList = edges.slice(0, 60);
    const [codeList, setCodeList] = useState(initialCodeList);
    const [states, dispatch] = useReducer(reducer, initialState);
    const list = useRef(codeList);
    let codes = useRef(null);

    const getCurrentScrollPercentage = () =>
        ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100;

    const handleSwitch = useCallback((e) => {
        if (e.target.checked) {
            if (states.bookmarkList.length !== 0) {
                dispatch({ type: 'switch', switch: true });
            } else {
                e.preventDefault();
                e.target.checked = false;
            }
        } else {
            dispatch({ type: 'switch', switch: false });
        }
    });

    const handleSearch = useCallback((e) => {
        dispatch({ type: 'search', search: e.target.value });
    });

    const handleCategory = useCallback((index) => {
        dispatch({ type: 'category', category: index });
    });

    const handleBookmark = useCallback((e, node) => {
        const nodeId = node.id;
        const overlapCode = states.bookmarkList.filter(
            (item) => nodeId === item.node.id,
        );

        const removeRestCodes = states.bookmarkList.filter(
            (item) => nodeId !== item.node.id,
        );

        e.stopPropagation();

        if (overlapCode.length === 0) {
            localStorage.setItem(nodeId, JSON.stringify(node));

            dispatch({
                type: 'bookmarkList',
                bookmarkList: [...states.bookmarkList, { node }],
            });

            dispatch({ type: 'bookmark', bookmark: true });

            setTimeout(() => {
                dispatch({ type: 'bookmark', bookmark: false });
            }, 500);
        } else {
            localStorage.removeItem(nodeId);
            dispatch({ type: 'bookmarkList', bookmarkList: removeRestCodes });
        }
    });

    const handleCopy = useCallback((code) => {
        const body = document.body;
        const dummy = document.createElement('textarea');

        body.appendChild(dummy);
        dummy.value = code;
        dummy.select();
        document.execCommand('copy');
        body.removeChild(dummy);
        dispatch({ type: 'copy', copy: true });

        setTimeout(() => {
            dispatch({ type: 'copy', copy: false });
        }, 500);
    });

    const handleScrollTop = useCallback(() => {
        setCodeList((allCode) => allCode.slice(0, 60));
    });

    const getList = () => {
        const initialCodeList = edges.slice(0, 60);
        const bookmarkIdList = states.bookmarkList.map((item) => item.node.id);
        const listLength = list.current.length;
        const searchLength = states.searchValue.length;
        const bookmarkLength = states.bookmarkList.length;

        const expression = () =>
            listLength <= 1 ||
            (listLength - searchLength > 1 && listLength - searchLength <= 60);

        const categoryList = [
            'Standard',
            'Emoji',
            'Latin',
            'Modifier Letters',
            'Diacritical Marks',
            'Greek and Coptic',
            'Cyrillic',
            'General Punctuation',
            'Currency Symbols',
            'Letterlike Symbols',
            'Arrows',
            'Mathematical Operators',
            'Box Drawings',
            'Block Elements',
            'Geometric Shapes',
            'Miscellaneous Symbols',
            'Dingbats',
        ];

        let bookmarkRestCodes;

        if (searchLength !== 0) {
            const searchCodes = edges.filter((item) =>
                states.searchValue.includes(item.node.char),
            );

            setCodeList(searchCodes);
        } else {
            if (states.categoryIndex === 0) {
                const filter = edges.filter(
                    (item) => !bookmarkIdList.includes(item.node.id),
                );

                setCodeList(initialCodeList);

                if (bookmarkLength !== 0) {
                    if (expression()) {
                        bookmarkRestCodes = filter.slice(
                            0,
                            60 - bookmarkLength,
                        );
                    } else {
                        bookmarkRestCodes = filter.slice(
                            0,
                            listLength - bookmarkLength,
                        );
                    }
                }

                codes.current = filter;
            }

            for (let i = 0; i <= categoryList.length; i++) {
                const filter = edges.filter(
                    (item) =>
                        item.node.category === categoryList[i] &&
                        !bookmarkIdList.includes(item.node.id),
                );

                if (states.categoryIndex === i + 1) {
                    setCodeList(
                        edges
                            .filter(
                                (item) =>
                                    item.node.category === categoryList[i],
                            )
                            .slice(0, 60),
                    );

                    codes.current = filter;

                    if (bookmarkLength !== 0) {
                        if (expression()) {
                            bookmarkRestCodes = filter.slice(
                                0,
                                60 - bookmarkLength,
                            );
                        } else {
                            bookmarkRestCodes = filter.slice(
                                0,
                                listLength - bookmarkLength,
                            );
                        }
                    }
                }
            }

            if (bookmarkLength !== 0) {
                if (states.switchState) {
                    setCodeList(states.bookmarkList);
                } else {
                    setCodeList([...states.bookmarkList, ...bookmarkRestCodes]);
                }
            }
        }
    };

    const scrollDown = () => {
        const searchLength = states.searchValue.length;

        setCodeList((allCode) => allCode.slice(0, 60));

        const handleScroll = () => {
            if (getCurrentScrollPercentage() > 90) {
                setCodeList((previousCodes) => {
                    let addList = previousCodes.length + 60;

                    return [
                        ...previousCodes,
                        ...codes.current.slice(previousCodes.length, addList),
                    ];
                });
            }
        };

        if (searchLength === 0 && !states.switchState) {
            window.addEventListener('scroll', handleScroll, false);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    };

    const getBookmark = () => {
        {
            let bookmark = [];

            for (const [key, value] of Object.entries(localStorage)) {
                if (!isNaN(Number(key))) {
                    const node = JSON.parse(value);

                    bookmark.push({ node });
                }
            }

            dispatch({ type: 'bookmarkList', bookmarkList: bookmark });
        }
    };

    list.current = codeList;

    useEffect(() => getList(), [
        edges,
        states.switchState,
        states.bookmarkList,
        states.searchValue,
        states.categoryIndex,
    ]);

    useEffect(() => scrollDown(), [
        states.searchValue,
        states.categoryIndex,
        states.switchState,
    ]);

    useEffect(() => getBookmark(), [localStorage]);

    return (
        <Layout>
            <Head title="main" />
            {states.copyState && (
                <Message message={'Copied to Clipboard! 😊'} />
            )}
            {states.bookmarkState && (
                <Message message={'Added to the bookmark! ⭐️'} />
            )}
            <SwitchBookmark handleSwitch={handleSwitch} />
            <Search handleSearch={handleSearch} />
            {!states.searchValue && (
                <Category
                    handleCategory={handleCategory}
                    categoryIndex={states.categoryIndex}
                />
            )}
            <CodeContainer>
                {codeList.length !== 0 ? (
                    codeList.map(({ node }, index) => (
                        <CodeItem
                            node={node}
                            handleCopy={handleCopy}
                            handleBookmark={handleBookmark}
                            key={node.id}
                        >
                            {!states.searchValue ? (
                                index < states.bookmarkList.length ? (
                                    <img src={marked} alt="marked" />
                                ) : (
                                    <img src={unmarked} alt="unmarked" />
                                )
                            ) : states.bookmarkList
                                  .map((item) => item.node.id)
                                  .includes(node.id) ? (
                                <img src={marked} alt="marked" />
                            ) : (
                                <img src={unmarked} alt="unmarked" />
                            )}
                        </CodeItem>
                    ))
                ) : (
                    <NoResult />
                )}
            </CodeContainer>
            <GoTop handleScrollTop={handleScrollTop} />
        </Layout>
    );
}

IndexPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default IndexPage;
