import { LitElement, html, customElement, property } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';


@customElement('vcf-field-description')
export class VcfFieldDescription extends LitElement {
    @property({type: Boolean})
    renderDescriptionAsHtml = false;

    @property({type: String})
    description = ""
/*
    @property({type: Boolean})
    expanded = false;
*/

    _isEllipsisActivated() {
        var _this = this;
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
                if(val) {
                    let iconElement = document.createElement('iron-icon');
                    iconElement.setAttribute('aria-hidden', 'true');
                    iconElement.setAttribute('tabindex', '-1');
                    iconElement.setAttribute('icon', 'vaadin:info-circle');
                    let _this = this;
                    iconElement.onclick = function(ev) {
                        console.log(ev);
                        _this.toggleExpandDescription();
                    }
                    element.appendChild(iconElement);
                }
            }
        });
    }

    toggleExpandDescription() {
        console.log('FUUUUU')
    }

    render() {
        return html`
            <style>
                vcf-field-description .field-description-container {
                    display: flex;
                }

                vcf-field-description .field-description {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    flex-grow: 1;
                }

                vcf-field-description .expand-icon-container {
                    flex-grow: 0;
                    min-width: 20px;
                }

                vcf-field-description .expand-icon-container iron-icon {
                    height: 15px;
                }
            </style>

            <div class="field-description-container">
                <div class="field-description">
                    <span class="field-description-inner-span">
                        ${ this.renderDescriptionAsHtml ? unsafeHTML(this.description) : this.description }
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