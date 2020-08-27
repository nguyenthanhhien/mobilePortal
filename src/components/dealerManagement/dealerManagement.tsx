import React from 'react';
import './dealerManagement.scss'
import { dealerApplicationConfigurationService } from '../../services/dealerApplicationConfigurationService'

import MaterialTable from 'material-table';
import i18next from "i18next";
import AddEditDealerApplicationConfig from './addEditDealerApplicationConfig'
import * as commonService from './../../services/commonService'
import { Button } from '@material-ui/core';


export default function DealerManagement() {
  const [isShowModal, setShowModal] = React.useState(false)
  const [keyObject, setKeyObject] = React.useState(-1)

  const editRow = (dataRow: any) => {
    setKeyObject(dataRow.DealerApplicationConfigurationKey)
    setShowModal(true);
  }

  const addRow = () => {
    setKeyObject(-1)
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

  return (
    <div className="table-style">
      <AddEditDealerApplicationConfig Open={isShowModal} Key={keyObject} HandleClose={hideModal}>
      </AddEditDealerApplicationConfig>
      <MaterialTable
        title=""
        tableRef={tableRef}
        columns={[
          { title: 'Key', field: 'DealerApplicationConfigurationKey', hidden: true },
          { title: 'Time', field: 'ExpiredDate', hidden: true },
          {
            title: i18next.t('DEALER_MANAGEMENT.DEALER_ID'), field: 'DealerId',
          },
          { title: i18next.t('DEALER_MANAGEMENT.APPLICATION'), field: 'Application' },

          { title: i18next.t('DEALER_MANAGEMENT.DEVICE_ID'), field: 'DeviceId' },
          { title: i18next.t('DEALER_MANAGEMENT.DEVICE_DESCRIPTION'), field: 'DeviceDescription' },
          {
            title: i18next.t('DEALER_MANAGEMENT.EXPIRIED_DATE'), field: 'ExpiredDateString',
          },
          {
            field: 'IsAllowAccess',
            title: i18next.t('DEALER_MANAGEMENT.ALLOW_ACCESS'),
            render: rowData => <Button className={"access-btn " + (rowData.IsAllowAccess ? "allow-btn" : "")} variant="contained" size="small" color="primary">
                {rowData.IsAllowAccess ? i18next.t('COMMON.YES') : i18next.t('COMMON.NO')}
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
          searchFieldAlignment: "left",
          pageSize: 10,
          pageSizeOptions: [10, 15, 20]
        }}
        data={query =>
          new Promise((resolve, reject) => {
            dealerApplicationConfigurationService.getAll(query)
              .then(result => {
                resolve({
                  data: result.ObjectList,
                  page: query.page,
                  totalCount: result.TotalItems
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