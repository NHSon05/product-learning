import React, { useEffect, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor, Alignment, AutoImage, AutoLink, Autoformat, Autosave,
    BalloonToolbar, BlockQuote, Bold, Bookmark, CKBox, CKBoxImageEdit,
    CloudServices, Code, CodeBlock, Emoji, Essentials, FindAndReplace,
    FontBackgroundColor, FontColor, FontFamily, FontSize, Fullscreen,
    GeneralHtmlSupport, Heading, Highlight, HorizontalLine, HtmlEmbed,
    ImageBlock, ImageCaption, ImageEditing, ImageInline, ImageInsert,
    ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative,
    ImageToolbar, ImageUpload, ImageUtils, Indent, IndentBlock, Italic,
    Link, LinkImage, List, ListProperties, MediaEmbed, Mention, PageBreak,
    Paragraph, PasteFromOffice, PictureEditing, PlainTableOutput, RemoveFormat,
    ShowBlocks, SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency,
    SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical,
    SpecialCharactersText, Strikethrough, Subscript, Superscript, Table,
    TableCaption, TableCellProperties, TableColumnResize, TableLayout,
    TableProperties, TableToolbar, TextPartLanguage, TextTransformation,
    TodoList, Underline, WordCount, type EditorConfig
} from 'ckeditor5';

import {
    AIChat, AIEditorIntegration, AIQuickActions, AIReviewMode, CaseChange,
    Comments, ExportPdf, ExportWord, ExportInlineStyles, Footnotes,
    FormatPainter, ImportWord, LineHeight, MergeFields, MultiLevelList,
    PasteFromOfficeEnhanced, PresenceList, RealTimeCollaborativeComments,
    RealTimeCollaborativeEditing, RealTimeCollaborativeRevisionHistory,
    RealTimeCollaborativeTrackChanges, RevisionHistory, SlashCommand,
    TableOfContents, Template, TrackChanges, TrackChangesData, TrackChangesPreview
} from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import './CKEditor.css';

// Constants
const LICENSE_KEY = 'eyJhbGciOiJFUzI1NiJ9...'; // Giữ nguyên key dài của bạn
const DOCUMENT_ID = 'demo-doc-id-123';
const CLOUD_SERVICES_TOKEN_URL = 'https://u1pwcn550vhl.cke-cs.com/token/dev/33e707d24c2d7a6c8cc62fd30091821bc1eefe0d05b03b70b64d2661adb7?limit=10';
const CLOUD_SERVICES_WEBSOCKET_URL = 'wss://u1pwcn550vhl.cke-cs.com/ws';

const Editor: React.FC = () => {
    const presenceContainerRef = useRef<HTMLDivElement>(null);
    const sidebarContainerRef = useRef<HTMLDivElement>(null);
    const wordCountContainerRef = useRef<HTMLDivElement>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const revisionHistoryRef = useRef<HTMLDivElement>(null);
    const revisionEditorRef = useRef<HTMLDivElement>(null);
    const revisionSidebarRef = useRef<HTMLDivElement>(null);

    const [isLayoutReady] = useState(true);
    const [editorConfig, setEditorConfig] = useState<EditorConfig | null>(null);

    useEffect(() => {
        if (isLayoutReady) {
            const config: EditorConfig = {
                licenseKey: LICENSE_KEY,
                plugins: [
                    AIChat, AIEditorIntegration, AIQuickActions, AIReviewMode, Alignment,
                    Autoformat, AutoImage, AutoLink, Autosave, BalloonToolbar, BlockQuote,
                    Bold, Bookmark, CaseChange, CKBox, CKBoxImageEdit, CloudServices, Code,
                    CodeBlock, Comments, Emoji, Essentials, ExportInlineStyles, ExportPdf,
                    ExportWord, FindAndReplace, FontBackgroundColor, FontColor, FontFamily,
                    FontSize, Footnotes, FormatPainter, Fullscreen, GeneralHtmlSupport,
                    Heading, Highlight, HorizontalLine, HtmlEmbed, ImageBlock, ImageCaption,
                    ImageEditing, ImageInline, ImageInsert, ImageInsertViaUrl, ImageResize,
                    ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload, ImageUtils,
                    ImportWord, Indent, IndentBlock, Italic, LineHeight, Link, LinkImage,
                    List, ListProperties, MediaEmbed, Mention, MergeFields, MultiLevelList,
                    PageBreak, Paragraph, PasteFromOffice, PasteFromOfficeEnhanced,
                    PictureEditing, PlainTableOutput, PresenceList, RealTimeCollaborativeComments,
                    RealTimeCollaborativeEditing, RealTimeCollaborativeRevisionHistory,
                    RealTimeCollaborativeTrackChanges, RemoveFormat, RevisionHistory,
                    ShowBlocks, SlashCommand, SpecialCharacters, SpecialCharactersArrows,
                    SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin,
                    SpecialCharactersMathematical, SpecialCharactersText, Strikethrough,
                    Subscript, Superscript, Table, TableCaption, TableCellProperties,
                    TableColumnResize, TableLayout, TableOfContents, TableProperties,
                    TableToolbar, Template, TextPartLanguage, TextTransformation, TodoList,
                    TrackChanges, TrackChangesData, TrackChangesPreview, Underline, WordCount
                ],
                toolbar: {
                    items: [
                        'undo', 'redo', '|', 'revisionHistory', 'trackChanges', 'comment', 'commentsArchive', '|',
                        'toggleAi', 'aiQuickActions', '|', 'bold', 'italic', 'underline', 'link', 'insertTable', 'imageInsert', 'ckbox'
                        // Thêm các item khác từ file gốc nếu cần
                    ],
                    shouldNotGroupWhenFull: false
                },
                // Cấu hình DOM elements thông qua Refs
                sidebar: {
                    container: sidebarContainerRef.current!
                },
                presenceList: {
                    container: presenceContainerRef.current!
                },
                revisionHistory: {
                    editorContainer: editorContainerRef.current!,
                    viewerContainer: revisionHistoryRef.current!,
                    viewerEditorElement: revisionEditorRef.current!,
                    viewerSidebarContainer: revisionSidebarRef.current!,
                    resumeUnsavedRevision: true
                },
                ai: {
                    container: { type: 'overlay', side: 'right' },
                    chat: {
                        context: { document: { enabled: true }, urls: { enabled: true }, files: { enabled: true } }
                    }
                },
                cloudServices: {
                    tokenUrl: CLOUD_SERVICES_TOKEN_URL,
                    webSocketUrl: CLOUD_SERVICES_WEBSOCKET_URL
                },
                collaboration: {
                    channelId: DOCUMENT_ID
                },
                initialData: '<h2>Congratulations on setting up CKEditor 5 in React TSX! 🎉</h2>'
            };
            setEditorConfig(config);
        }
    }, [isLayoutReady]);

    return (
        <div className="main-container" ref={editorContainerRef}>
            {/* Presence list for real-time collab */}
            <div className="presence" ref={presenceContainerRef}></div>

            <div className="editor-container editor-container_classic-editor editor-container_include-annotations">
                <div className="editor-container__editor-wrapper">
                    <div className="editor-container__editor">
                        {isLayoutReady && editorConfig && (
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfig}
                                onReady={(editor) => {
                                    // Chèn Word Count plugin vào container
                                    const wordCount = editor.plugins.get('WordCount');
                                    if (wordCountContainerRef.current) {
                                        wordCountContainerRef.current.appendChild(wordCount.wordCountContainer);
                                    }
                                }}
                            />
                        )}
                        <div className="editor_container__word-count" ref={wordCountContainerRef}></div>
                    </div>
                    {/* Sidebar container for comments/track changes */}
                    <div className="editor-container__sidebar" ref={sidebarContainerRef}></div>
                </div>
            </div>

            {/* Revision History UI containers */}
            <div className="revision-history" ref={revisionHistoryRef}>
                <div className="revision-history__wrapper">
                    <div className="revision-history__editor" ref={revisionEditorRef}></div>
                    <div className="revision-history__sidebar" ref={revisionSidebarRef}></div>
                </div>
            </div>
        </div>
    );
};

export default Editor;