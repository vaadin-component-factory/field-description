import { LitElement, html, customElement, property } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';


@customElement('vcf-field-description')
export class VcfFieldDescription extends LitElement {
    @property({type: Boolean})
    renderDescriptionAsHtml = false;

    @property({type: String})
    description = ""

    @property({type: Boolean})
    reserveDescriptionHeight = false;

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
            let containerElement = this.querySelector<HTMLElement>('.field-description-container');
            let textElement = this.querySelector<HTMLElement>('.field-description');
            let helperElement = this.querySelector<HTMLElement>('.field-description-helper-textmeasurements');
            if(!containerElement || !helperElement) return;

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
            let minContainerHeight = 1;
            if(this.reserveDescriptionHeight) minContainerHeight = minContainerHeight + this._fieldDescriptionTextMeasuredHeight;
            containerElement.style.minHeight = `${minContainerHeight}px`
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
            </style>

            <div class="field-description-container">
                <div class="field-description">
                    ${ this._setDoubleClickListener() }
                    <span class="field-description-inner-span">
                        ${ this.renderDescriptionAsHtml ? unsafeHTML(this.description) : this.description }
                    </span>
                    <span class="field-description-helper field-description-helper-textmeasurements">
                        ${ this.renderDescriptionAsHtml ? unsafeHTML(this.description) : this.description }
                        ${ this._takeMeasurementsAndReserveHeights() }
                    </span>
                </div>
                <div class="expand-icon-container">
                    ${ this._renderExpandIcon() }
                </div>
            </div>`;
    }

    createRenderRoot() {
      /**
       * Render template without shadow DOM.
       */
        return this;
    }

}