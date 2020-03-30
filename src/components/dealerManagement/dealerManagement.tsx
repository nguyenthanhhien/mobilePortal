import React, { Component, forwardRef, useEffect, useContext } from 'react';
import './dealerManagement.scss'
import { dealerApplicationConfigurationService } from '../../services/dealerApplicationConfigurationService'
import { DealerApplicationConfigurationModel } from './../../models/models'

import MaterialTable, { Column } from 'material-table';
import i18next from "i18next";
import AddEditDealerApplicationConfig from './addEditDealerApplicationConfig'
import * as commonService from './../../services/commonService'
import AddBox from '@material-ui/icons/AddBox';
import { Button } from '@material-ui/core';
import LoadingContext from '../context/loadingContext'

interface TableState {
  columns: Array<Column<DealerApplicationConfigurationModel>>;
  data: DealerApplicationConfigurationModel[];
}


export default function DealerManagement() {
  const [isShowModal, setShowModal] = React.useState(false)
  const [keyObject, setKeyObject] = React.useState<number>()
  const [isReload, setReload] = React.useState(false)

  const editRow = (dataRow: any) => {
    setKeyObject(dataRow.dealerApplicationConfigurationKey)
    setShowModal(true);
  }

  const addRow = () => {
    setShowModal(true);
  };
  const tableRef = React.createRef<any>();
  const hideModal = (isUpdated?: boolean) => {
    if (isUpdated) {
      if (tableRef.current) {
        tableRef.current.onQueryChange()
      }
    }
    setShowModal(false);
  };

  const handleSelectAll = () => {
    if (tableRef.current) {
      tableRef.current.onQueryChange()
    }

  }

  return (
    <div className="table-style">
      <AddEditDealerApplicationConfig Open={isShowModal} Key={keyObject} HandleClose={hideModal}>
      </AddEditDealerApplicationConfig>
      <MaterialTable
        title=""
        tableRef={tableRef}
        columns={[
          { title: 'Key', field: 'dealerApplicationConfigurationKey', hidden: true },
          { title: 'Time', field: 'expiredDate', hidden: true },
          {
            title: i18next.t('DEALER_MANAGEMENT.DEALER_ID'), field: 'dealerId',
          },
          { title: i18next.t('DEALER_MANAGEMENT.APPLICATION'), field: 'application' },

          { title: i18next.t('DEALER_MANAGEMENT.DEVICE_ID'), field: 'deviceId' },
          { title: i18next.t('DEALER_MANAGEMENT.DEVICE_DESCRIPTION'), field: 'deviceDescription' },
          {
            title: i18next.t('DEALER_MANAGEMENT.EXPIRIED_DATE'), field: 'expiredDateString',
          },
          {
            field: 'isAllowAccess',
            title: i18next.t('DEALER_MANAGEMENT.ALLOW_ACCESS'),
            render: rowData => <Button className={"access-btn " + (rowData.isAllowAccess ? "allow-btn" : "")} variant="contained" size="small" color="primary">
                {rowData.isAllowAccess ? i18next.t('COMMON.YES') : i18next.t('COMMON.NO')}
              </Button >
          }
        ]}
        actions={[
          {
            icon: 'edit',
            tooltip: i18next.t('COMMON.EDIT'),
            onClick: (event, rowData) => editRow(rowData)
          },
          {
            icon: 'add_box',
            tooltip: 'Add',
            isFreeAction: true,
            onClick: () => addRow(),
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          debounceInterval: 2000,
          searchFieldAlignment: "left"
        }}
        data={query =>
          new Promise((resolve, reject) => {
            dealerApplicationConfigurationService.getAll(query)
              .then(result => {
                resolve({
                  data: result.objectList,
                  page: query.page,
                  totalCount: result.totalItems
                })
              })
              .catch(error => {
                commonService.handleErrorResponse(error)
              })
          })
        }
      />

    </div>

  )

}