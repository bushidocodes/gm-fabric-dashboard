package com.blackbox.siteSpecific.tests.api;

import com.blackbox.siteSpecific.framework.base.ApiTest;
import com.blackbox.siteSpecific.framework.services.FinderService;
import org.junit.Assert;
import org.junit.Test;

public class FinderServiceTests extends ApiTest {
    @Test
    public void happyPath() {
        // Set up objects
        FinderService finderService = new FinderService(deployment, deployment.truststore, deployment.testerOneKeystore);

        // Hit the /data/sources endpoint
        finderService.getDataSources();

        // Validate the format of the /data/services response
        Assert.assertTrue(finderService.isDataSourcesResponseFormatValid());

        // Hit the /data/sources/(sourceId) endpoint
        // TODO

        // Hit the /data/sources/internal endpoint
        finderService.getDataSourcesInternal();

        // Validate the format of the /data/services/internal response
        Assert.assertTrue(finderService.isDataSourcesResponseFormatValid());

        // Hit the /data/sources/categories endpoint
        finderService.getDataSourcesCategories();

        // Validate the format of the /data/services/categories response
        Assert.assertTrue(finderService.isDataSourcesResponseFormatValid());

        // Hit the /data/sources/categories/(categoryId) endpoint
        // TODO
    }
}
