import { LitElement, html, customElement, property } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';


@customElement('vcf-field-description')
export class VcfFieldDescription extends LitElement {
    @property({type: Boolean})
    renderDescriptionAsHtml = false;

    @property({type: String})
    description = "";

    @property({type: Boolean})
    renderFeedbackAsHtml = false;

    @property({type: String})
    feedbackState = "INFO";

    @property({type: String})
    feedbackContent = null;

    @property({type: Boolean})
    reserveDescriptionHeight = false;

    @property({type: Boolean})
    reserveFeedbackHeight = false;

    @property({type: Boolean})
    expandButtonIsKbFocusable = false;

    @property({type: Boolean})
    _expanded = false;

    @property({type: Boolean})
    _expanding = false;

    @property({type: Number})
    _fieldDescriptionTextMeasuredWidth = -1;

    @property({type: Number})
    _fieldDescriptionTextMeasuredHeight = -1;

    _isEllipsisActivated() {
        let _this = this;
        return new Promise((resolve) => setTimeout(() => {
            let fieldDescriptionContainerElement = _this.querySelector<HTMLElement>('.field-description');
            if(fieldDescriptionContainerElement != null) {
                if(fieldDescriptionContainerElement.offsetWidth < fieldDescriptionContainerElement.scrollWidth) resolve(true);
            }
            resolve(false);
        }, 10));
    }

    _renderExpandIcon() {
        this._isEllipsisActivated().then(val => {
            let element = this.querySelector<HTMLElement>('.expand-icon-container');
            if(element) {
                element.innerHTML = '';
                let iconElement = document.createElement('iron-icon');
                iconElement.setAttribute('aria-hidden', 'true'); //TODO: should this be set to false when expandbutton is focusable ?
                iconElement.setAttribute('tabindex', this.expandButtonIsKbFocusable ? '0' : '-1');
                let _this = this;
                iconElement.onclick = function(ev) {
                    console.log(ev);
                    _this.toggleExpandDescription();
                }
                element.appendChild(iconElement);
                if(val) {
                    iconElement.setAttribute('icon', 'vaadin:info-circle');
                } else {
                    if(this._expanded || this._expanding) iconElement.setAttribute('icon', 'vaadin:chevron-circle-up');
                }
            }
        });
    }

    _takeMeasurementsAndReserveHeights() {
        this._isEllipsisActivated().then(val => {
            let wrapperElement = this.querySelector<HTMLElement>('.field-description-component-wrapper');
            let textElement = this.querySelector<HTMLElement>('.field-description');
            let helperElement = this.querySelector<HTMLElement>('.field-description-helper-textmeasurements');
            if(!wrapperElement || !helperElement) return;

            if(textElement && helperElement) {
                if(val || this._expanded) {
                    this._fieldDescriptionTextMeasuredWidth = textElement.offsetWidth;
                    helperElement.style.width = `${this._fieldDescriptionTextMeasuredWidth}px`;
                    this._fieldDescriptionTextMeasuredHeight = helperElement.offsetHeight;
                }
            } else {
                this._fieldDescriptionTextMeasuredWidth = -1;
                this._fieldDescriptionTextMeasuredHeight = -1;
            }

            //reserve heights
            let minWrapperHeight = 1;
            if(this.reserveDescriptionHeight) minWrapperHeight = minWrapperHeight + this._fieldDescriptionTextMeasuredHeight;
            wrapperElement.style.minHeight = `${minWrapperHeight}px`
        });
    }

    _setDoubleClickListener() {
        let element = this.querySelector<HTMLElement>('.field-description');
        if(!element) return;
        let _this = this;
        element.ondblclick = function(ev) {
            console.log(ev)
            _this.toggleExpandDescription();
        }
    }

    toggleExpandDescription() {
        this._expanding = true;
        this._expanded = !this._expanded;

        this._isEllipsisActivated().then(ellipsis => {
            let element = this.querySelector<HTMLElement>('.field-description');
            if(element) {
                if(ellipsis || !this._expanded) {
                    if(this._expanded) {
                        element.style.textOverflow = 'unset';
                        element.style.whiteSpace = 'unset';
                        element.style.maxHeight = this._fieldDescriptionTextMeasuredHeight != -1 ? this._fieldDescriptionTextMeasuredHeight + 'px' : 'none';
                        this._expanding = false;
                    } else {
                        element.style.maxHeight = '20px';
                        setTimeout(() => {
                            if(!element) return;
                            element.style.textOverflow = 'ellipsis';
                            element.style.whiteSpace = 'nowrap';
                            this._renderExpandIcon();
                            this._expanding = false;
                        }, 800)
                    }
                }
            }
        })
    }

    render() {
        return html`
            <style>
                :root {
                    --field-description-success-color: var(--lumo-success-text-color);
                    --field-description-info-color: #2a88c7;
                    --field-description-warn-color: #c78f2a;
                    --field-description-error-color: var(--lumo-error-text-color);
                }

                vcf-field-description .field-description-container {
                    display: flex;
                }

                vcf-field-description .field-description {
                    flex-grow: 1;
                    padding-top: 1px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    transition: max-height 0.8s;
                    max-height: 20px;
                }

                vcf-field-description .expand-icon-container {
                    flex-grow: 0;
                    min-width: 20px;
                    cursor: pointer;
                }

                vcf-field-description .expand-icon-container iron-icon {
                    height: 15px;
                }

                vcf-field-description .field-description .field-description-helper.field-description-helper-textmeasurements {
                    position: absolute;
                    left: 0;
                    top: 0;
                    white-space: normal;
                    z-index: -1;
                    visibility: hidden;
                    white-space: normal;
                }

                vcf-field-description .field-description-feedback-container[data-state="SUCCESS"] {
                    color: var(--field-description-success-color);
                }

                vcf-field-description .field-description-feedback-container[data-state="INFO"] {
                    color: var(--field-description-info-color);
                }

                vcf-field-description .field-description-feedback-container[data-state="WARN"] {
                    color: var(--field-description-warn-color);
                }

                vcf-field-description .field-description-feedback-container[data-state="ERROR"] {
                    color: var(--field-description-error-color);
                }

                vcf-field-description .field-description-feedback-container iron-icon {
                    height: 14px;
                    vertical-align: top;
                }

                vcf-field-description .field-description-feedback {
                    margin-top: 18px;
                    display: table;
                }

                vcf-field-description .field-description-feedback > * {
                    display: table-cell;
                }
            </style>

            <div class="field-description-component-wrapper">
                <div class="field-description-container">
                    <div class="field-description">
                        ${ this._setDoubleClickListener() }
                        ${ this.renderDescriptionAsHtml ? unsafeHTML(this.description) : html`<span>${this.description}` }</span>
                        <div class="field-description-helper field-description-helper-textmeasurements" aria-hidden="true">
                            ${ this.renderDescriptionAsHtml ? unsafeHTML(this.description) : this.description }
                            ${ this._takeMeasurementsAndReserveHeights() }
                        </div>
                    </div>
                    <div class="expand-icon-container">
                        ${ this._renderExpandIcon() }
                    </div>
                </div>
                <div class=field-description-feedback-container data-state="${this.feedbackState}">
                    ${this.feedbackContent ? this.renderFeedback() : ''}
                </div>
            </div>`;
    }

    renderFeedback() {
        if(!this.feedbackContent) return html``;

        return html`
            <div class="field-description-feedback" data-state="${this.feedbackState}" aria-live="assertive">
                <iron-icon icon="vaadin:info"></iron-icon>
                ${ this.renderFeedbackAsHtml ? unsafeHTML(this.feedbackContent) : html`<span>${this.feedbackContent}` }</span>
            </div>`;
    }

    createRenderRoot() {
      /**
       * Render template without shadow DOM.
       */
        return this;
    }

}