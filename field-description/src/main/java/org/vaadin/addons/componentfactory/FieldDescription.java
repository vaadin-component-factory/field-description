package org.vaadin.addons.componentfactory;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasSize;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

//@NpmPackage(value = "lumo-css-framework", version = "^4.0.10")
//@NpmPackage(value = "line-awesome", version = "1.3.0")
@Tag("vcf-field-description")
//@NpmPackage(value = "@vaadin-component-factory/vcf-field-description", version = "0.0.1")
//@JsModule("@vaadin-component-factory/vcf-field-description/src/vcf-field-description.ts")
@JsModule("./vcf-field-description.ts")
//@CssImport(value = "@vaadin-component-factory/vcf-field-description/styles/style.css")
public class FieldDescription extends Component implements IFieldDescription, HasSize {
    public FieldDescription() { }

    public FieldDescription(String description) {
        setDescription(description);
    }

    @Override
    public String getDescription() {
        return getElement().getProperty("description");
    }

    @Override
    public void removeDescription() {
        getElement().setProperty("description", "");
    }

    @Override
    public void setDescription(String description) {
        getElement().setProperty("renderDescriptionAsHtml", false);
        getElement().setProperty("description", description);
    }

    @Override
    public void setDescriptionAsHtml(String description) {
        getElement().setProperty("renderDescriptionAsHtml", true);
        getElement().setProperty("description", description);
    }

    @Override
    public boolean isReserveDescriptionHeight() {
        return getElement().getProperty("reserveDescriptionHeight", false);
    }

    @Override
    public void setReserveDescriptionHeight(boolean reserveDescriptionHeight) {
        getElement().setProperty("reserveDescriptionHeight", reserveDescriptionHeight);
    }

    @Override
    public boolean isReadMoreFocusable() {
        return getElement().getProperty("expandButtonIsKbFocusable", false);
    }

    @Override
    public void setReadMoreFocusable(boolean readMoreFocusable) {
        getElement().setProperty("expandButtonIsKbFocusable", readMoreFocusable);
    }

    @Override
    public String getFeedback() {
        return getElement().getProperty("feedbackContent");
    }

    @Override
    public FeedbackState getState() {
        return FeedbackState.valueOf(getElement().getProperty("feedbackState"));
    }

    @Override
    public void setFeedback(String feedback, FeedbackState state) {
        getElement().setProperty("renderFeedbackAsHtml", false);
        getElement().setProperty("feedbackContent", feedback);
        getElement().setProperty("feedbackState", state.name());
    }

    @Override
    public void setFeedbackAsHtml(String feedback, FeedbackState state) {
        getElement().setProperty("renderFeedbackAsHtml", true);
        getElement().setProperty("feedbackContent", feedback);
        getElement().setProperty("feedbackState", state.name());
    }

    @Override
    public void removeFeedback() {
        getElement().setProperty("feedbackContent",  null);
    }

    @Override
    public boolean isReserveFeedbackHeight() {
        return getElement().getProperty("reserveFeedbackHeight", false);
    }

    @Override
    public void setReserveFeedbackHeight(boolean reserveFeedbackHeight) {
        getElement().setProperty("reserveFeedbackHeight", reserveFeedbackHeight);
    }
}
