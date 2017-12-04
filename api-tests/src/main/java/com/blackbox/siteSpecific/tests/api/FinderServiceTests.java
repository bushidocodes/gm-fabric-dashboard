package com.blackbox.siteSpecific.tests.api;

import com.blackbox.siteSpecific.framework.base.ApiTest;
import com.blackbox.siteSpecific.framework.services.FinderService;
import com.google.gson.JsonElement;
import org.junit.Assert;
import org.junit.Test;

public class FinderServiceTests extends ApiTest {
    @Test
    public void happyPath() {
        // Set up objects
        FinderService finderService = new FinderService(deployment, deployment.truststore, deployment.testerOneKeystore);
        int sourceIndex = 0;
        int categoryIndex = 0;
        String sourceId;
        String categoryId;

        // Hit the /data/sources endpoint
        finderService.getDataSources();

        // Validate the format of the /data/sources response
        Assert.assertTrue(finderService.isDataSourcesResponseFormatValid());

        // Select an ID from the /data/sources response and use it to hit the /data/sources/(sourceId) endpoint
        sourceId = finderService.getResponse().getAsJsonArray().get(sourceIndex).getAsJsonObject().get(FinderService.DATA_SOURCES_RESPONSE_ID_KEY).getAsString();
        finderService.getDataSources(sourceId);

        // Validate the format of the /data/sources/(sourceId) response
        Assert.assertTrue(finderService.isDataSourcesResponseFormatValid());

        // Hit the /data/sources/internal endpoint
        finderService.getDataSourcesInternal();

        // Validate the format of the /data/sources/internal response
        Assert.assertTrue(finderService.isDataSourcesResponseFormatValid());

        // Hit the /data/sources/categories endpoint
        finderService.getDataSourcesCategories();

        // Validate the format of the /data/sources/categories response
        // NOTE: This is currently failing because one of the entries in the response does not have the urlTemplate field.
        Assert.assertTrue(finderService.isDataSourcesCategoriesResponseFormatValid());

        // Select an ID from the /data/sources/categories response and use it to hit the /data/sources/categories/(categoryId) endpoint
        categoryId = finderService.getResponse().getAsJsonArray().get(categoryIndex).getAsJsonObject().get(FinderService.DATA_SOURCES_CATEGORIES_RESPONSE_ID_KEY).getAsString();
        finderService.getDataSourcesCategories(categoryId);

        // Validate the format of the /data/sources/categories/(categoryId) response
        Assert.assertTrue(finderService.isDataSourcesCategoriesResponseFormatValid());
    }
}
